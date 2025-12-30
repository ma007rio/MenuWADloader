document.addEventListener('DOMContentLoaded', () => {
  const versionSelect = document.getElementById('version');
  const btn = document.getElementById('downloadBtn');
  const status = document.getElementById('status');

  const versions = [
    '1.0U','1.0J',
    '2.0U','2.0E','2.0J',
    '2.1U','2.1E','2.1J',
    '2.2U','2.2E','2.2J',
    '3.0U','3.0E','3.0J',
    '3.1U','3.1E','3.1J',
    '3.2U','3.2E','3.2J',
    '3.3U','3.3E','3.3J','3.3K',
    '3.4U','3.4E','3.4J',
    '3.5K',
    '4.0U','4.0E','4.0J',
    '4.1U','4.1E','4.1J','4.1K',
    '4.2U','4.2E','4.2J','4.2K',
    '4.3U','4.3E','4.3J','4.3K'
  ];

  versions.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    versionSelect.appendChild(opt);
  });

  versionSelect.value = '4.3U';

  const BASE_URL = 'https://repo.mariocube.com/WADs/_WiiWare%2C%20VC%2C%20DLC%2C%20Channels%20%26%20IOS/_Dangerous/';

  function setStatus(msg, isError) {
    status.textContent = msg;
    status.style.color = isError ? 'crimson' : '#333';
  }

  async function downloadWad(version) {
    const region = version[3];
    const ver = version.substring(0, 3);
    let regionCode = '';
    if (region === 'U') {
      regionCode = 'USA';
    } else if (region === 'E') {
      regionCode = 'Europe';
    } else if (region === 'J') {
      regionCode = 'Japan';
    } else if (region === 'K') {
      regionCode = 'Korea';
    }
    const filename = `Wii%20Menu%20%28${regionCode}%29%20%28v${ver}%29.wad`;
    const url = BASE_URL + filename;

    setStatus('Downloading...');
    btn.disabled = true;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Not found or server error (' + res.status + ')');

      const blob = await res.blob();
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'Wii-Menu-' + version + '.wad';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);

      setStatus('Downloaded!');
    } catch (err) {
      setStatus('Error: ' + err.message, true);
    } finally {
      btn.disabled = false;
    }
  }

  btn.addEventListener('click', () => {
    const version = versionSelect.value;
    downloadWad(version);
  });

});
