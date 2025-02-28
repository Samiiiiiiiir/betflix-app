import React, { useEffect, useState } from 'react';

import './videoPlayer.css';

import { useLocation } from 'react-router';

const VideoPlayer = () => {
  const { pathname } = useLocation();

  const [scriptHtml, setScriptHtml] = useState('');

  useEffect(() => {
    async function get() {
      const dataUrl = window.location.href;
      const req = await fetch(
        '//js.espanplay.site/get_player?w=610&h=370&type=widget&kp_id=&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=' +
          dataUrl,
      );
      const data = await req.text();
      /*    console.log(data);
      console.log(data.match(/<iframe.*<\/iframe>/gm)[1]); */
      setScriptHtml(data.match(/<iframe.*<\/iframe>/gm)[1]);
    }
    get();
    console.log('hi from use effect');
  }, [pathname]);

  return (
    <div
      className="uitools"
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    ></div>
  );
};

export default VideoPlayer;
