#!/usr/bin/env python3
'''AP Music & Audio - improv analyzer (AI-DRAFT first pass).

Usage:  python analyze_improv.py <file.mp3> [<file2.mp3> ...]
Output: one JSON per input with key candidates, tempo estimate,
        chroma-based chord timeline (8 s blocks), and candidate
        section boundaries. EVERY result is AI-DRAFT status:
        it is a draft for Oliver's ear-verification, never truth.

Free by design (project rule 2): librosa + numpy only, no paid APIs.
'''
import json
import sys

import numpy as np
import librosa

SR = 16000
PITCHES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
MAJ_PROF = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
MIN_PROF = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])

CHORD_TMPLS = {}
for root in range(12):
    for name, iv in [(PITCHES[root], [0, 4, 7]), (PITCHES[root] + 'm', [0, 3, 7]),
                     (PITCHES[root] + 'maj7', [0, 4, 7, 11]), (PITCHES[root] + 'm7', [0, 3, 7, 10])]:
        tmpl = np.zeros(12)
        for i in iv:
            tmpl[(root + i) % 12] = 1
        CHORD_TMPLS[name] = tmpl


def fmt(t):
    return f'{int(t // 60):02d}:{int(t % 60):02d}'


def analyze(path, n_sections=5):
    y, sr = librosa.load(path, sr=SR, mono=True)
    dur = len(y) / sr
    oenv = librosa.onset.onset_strength(y=y[:120 * sr], sr=sr, hop_length=1024)
    tg = librosa.feature.tempo(onset_envelope=oenv, sr=sr, hop_length=1024,
                               aggregate=None, std_bpm=4)
    bpm = float(np.median(tg))
    chroma = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=1024)
    cmean = chroma.mean(axis=1)
    keys = []
    for i in range(12):
        keys.append((float(np.corrcoef(np.roll(MAJ_PROF, i), cmean)[0, 1]), PITCHES[i] + ' major'))
        keys.append((float(np.corrcoef(np.roll(MIN_PROF, i), cmean)[0, 1]), PITCHES[i] + ' minor'))
    keys.sort(key=lambda x: -x[0])
    win = int(8 * sr / 1024) + 1
    blocks = []
    for b in range(max(1, chroma.shape[1] // win)):
        agg = chroma[:, b * win:(b + 1) * win].mean(axis=1)
        t0 = float(librosa.frames_to_time(b * win, sr=sr, hop_length=1024))
        if agg.max() == 0 or np.linalg.norm(agg) == 0:
            blocks.append([fmt(t0), None, 0.0])
            continue
        gn = np.linalg.norm(agg)
        best, best_score = None, -9.0
        for name, templ in CHORD_TMPLS.items():
            s = float(agg @ templ / (gn * np.linalg.norm(templ)))
            if s > best_score:
                best_score, best = s, name
        blocks.append([fmt(t0), best, round(best_score, 2)])
    try:
        bounds = librosa.segment.agglomerative(chroma, n_sections)
        secs = [fmt(float(x)) for x in librosa.frames_to_time(bounds, sr=sr, hop_length=1024)]
    except Exception:
        secs = []
    return {
        'status': 'AI-DRAFT - verify by ear',
        'file': path,
        'duration': fmt(dur),
        'bpm_median': round(bpm, 1),
        'bpm_confidence': 'low',
        'key_candidates': [{'key': k, 'score': round(s, 2)} for s, k in keys[:3]],
        'section_boundaries': secs,
        'chord_blocks': blocks,
    }


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    for p in sys.argv[1:]:
        out = p.rsplit('.', 1)[0] + '.analysis.json'
        res = analyze(p)
        with open(out, 'w') as fh:
            json.dump(res, fh, indent=1)
        print(out, res['duration'], '~' + str(res['bpm_median']) + 'bpm',
              res['key_candidates'][0]['key'])
