Recording and verification scripts (Playwright). Run from a scratch dir with `npm i playwright ffmpeg-static && npx playwright install chromium-headless-shell`, serve the portal with `python3 -m http.server 8787`, then:

    node record.mjs http://127.0.0.1:8787 ./out     # writes out/dash-run.webm
    node verify.mjs http://127.0.0.1:8787           # independent check: guard, bad creds, filter route, token

Convert with ffmpeg-static to mp4/webm/gif into ../assets/.
