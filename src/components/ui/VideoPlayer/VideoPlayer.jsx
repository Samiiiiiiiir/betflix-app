import React, { useEffect, useState } from 'react';

import './videoPlayer.css';

const VideoPlayer = () => {
  const [scriptHtml, setScriptHtml] = useState('');

  useEffect(() => {
    async function get() {
      const dataUrl = window.location.href;
      const req = await fetch(
        '//js.espanplay.site/get_player?w=610&h=370&type=widget&kp_id=&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=' +
          dataUrl,
      );
      const data = await req.text();
      console.log(data);
      console.log(data.match(/<iframe.*<\/iframe>/gm)[1]);
      setScriptHtml(data.match(/<iframe.*<\/iframe>/gm)[1]);
    }
    get();
  }, []);

  return (
    <div
      className="uitools"
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    ></div>
  );
};

export default VideoPlayer;
