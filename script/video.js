  const video = document.getElementById('mp4Video');
        const loadingMask = document.getElementById('loadingMask');

        let targetTime = 0;
        let isSeeking = false;
        let rafId = null;


        function initVideoControl() {
            if (loadingMask) {
                loadingMask.style.opacity = '0';
                setTimeout(() => loadingMask.style.display = 'none', 300);
            }

  
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll(); 
        }


        if (video.readyState >= 2) {
            initVideoControl();
        } else {
            video.addEventListener('loadeddata', initVideoControl);
        }

        function onScroll() {
            if (!video.duration) return;


            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));


            targetTime = scrollFraction * video.duration;


            requestRender();
        }

        function requestRender() {
            if (rafId) return;
            rafId = requestAnimationFrame(updateVideoFrame);
        }

        function updateVideoFrame() {
            rafId = null;


            if (isSeeking) return;


            if (Math.abs(video.currentTime - targetTime) > 0.04) {
                isSeeking = true;
                video.currentTime = targetTime;
            }
        }

        video.addEventListener('seeked', () => {
            isSeeking = false;
            if (Math.abs(video.currentTime - targetTime) > 0.04) {
                requestRender();
            }
        });

/***************/
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('mp4Video');
  const loadingMask = document.getElementById('loadingMask');
  const heroText = document.getElementById('heroText');
  const educationText = document.getElementById('educationText');

  if (!video) return;

  let targetTime = 0;
  let rafId = null;

  function initScrollVideo() {
    video.pause();

    if (loadingMask) {
      loadingMask.style.opacity = '0';
      setTimeout(() => {
        loadingMask.style.display = 'none';
      }, 500);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (video.readyState >= 1 && video.duration) {
    initScrollVideo();
  } else {
    video.addEventListener('loadedmetadata', initScrollVideo);
  }

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // 1. 顶部 Hero 文字淡出 (0s - 1s 区间)
    if (heroText && maxScroll > 0) {
      const fadeProgress = scrollTop / (window.innerHeight * 0.6);
      heroText.style.opacity = Math.max(0, 1 - fadeProgress);
    }

    if (!video.duration || maxScroll <= 0) return;

    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetTime = scrollFraction * video.duration;

    requestRender();
  }

  function requestRender() {
    if (!rafId) {
      rafId = requestAnimationFrame(updateVideoFrame);
    }
  }

  function updateVideoFrame() {
    rafId = null;
    if (!video.duration) return;

    const diff = targetTime - video.currentTime;

    // 逼近目标时间帧
    if (Math.abs(diff) > 0.01) {
      video.currentTime += diff * 0.15;
      requestRender();
    } else {
      video.currentTime = targetTime;
    }

    // 2. 检查当前视频时间，控制 Education 文本在 00:02 附近显示
    // 当视频时间在 1.8秒 到 2.8秒 之间时展示 Education
    if (educationText) {
      if (video.currentTime >= 1.8 && video.currentTime <= 2.8) {
        educationText.classList.add('is-visible');
      } else {
        educationText.classList.remove('is-visible');
      }
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('mp4Video');
  const loadingMask = document.getElementById('loadingMask');
  const heroText = document.getElementById('heroText');
  const educationText = document.getElementById('educationText');
  const workText = document.getElementById('workText'); // Work Experience Element

  if (!video) return;

  let targetTime = 0;
  let rafId = null;

  function initScrollVideo() {
    video.pause();

    if (loadingMask) {
      loadingMask.style.opacity = '0';
      setTimeout(() => {
        loadingMask.style.display = 'none';
      }, 500);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (video.readyState >= 1 && video.duration) {
    initScrollVideo();
  } else {
    video.addEventListener('loadedmetadata', initScrollVideo);
  }

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // 1. Hero Text fades out near start (0s - 1s)
    if (heroText && maxScroll > 0) {
      const fadeProgress = scrollTop / (window.innerHeight * 0.6);
      heroText.style.opacity = Math.max(0, 1 - fadeProgress);
    }

    if (!video.duration || maxScroll <= 0) return;

    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetTime = scrollFraction * video.duration;

    requestRender();
  }

  function requestRender() {
    if (!rafId) {
      rafId = requestAnimationFrame(updateVideoFrame);
    }
  }

  function updateVideoFrame() {
    rafId = null;
    if (!video.duration) return;

    const diff = targetTime - video.currentTime;

    if (Math.abs(diff) > 0.01) {
      video.currentTime += diff * 0.15;
      requestRender();
    } else {
      video.currentTime = targetTime;
    }

    // 2. Education section appears around 00:02 (1.8s - 2.8s)
    if (educationText) {
      if (video.currentTime >= 1.8 && video.currentTime <= 2.8) {
        educationText.classList.add('is-visible');
      } else {
        educationText.classList.remove('is-visible');
      }
    }

    // 3. Work Experience section appears around 00:05 (4.8s - 5.8s)
    if (workText) {
      if (video.currentTime >= 4.8 && video.currentTime <= 5.8) {
        workText.classList.add('is-visible');
      } else {
        workText.classList.remove('is-visible');
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('mp4Video');
  const loadingMask = document.getElementById('loadingMask');
  const heroText = document.getElementById('heroText');
  const educationText = document.getElementById('educationText');
  const skillsText = document.getElementById('skillsText');
  const workText = document.getElementById('workText');

  if (!video) return;

  let targetTime = 0;
  let rafId = null;

  function initScrollVideo() {
    video.pause();

    if (loadingMask) {
      loadingMask.style.opacity = '0';
      setTimeout(() => {
        loadingMask.style.display = 'none';
      }, 500);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (video.readyState >= 1 && video.duration) {
    initScrollVideo();
  } else {
    video.addEventListener('loadedmetadata', initScrollVideo);
  }

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (heroText && maxScroll > 0) {
      const fadeProgress = scrollTop / (window.innerHeight * 0.6);
      heroText.style.opacity = Math.max(0, 1 - fadeProgress);
    }

    if (!video.duration || maxScroll <= 0) return;

    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetTime = scrollFraction * video.duration;

    requestRender();
  }

  function requestRender() {
    if (!rafId) {
      rafId = requestAnimationFrame(updateVideoFrame);
    }
  }

  function updateVideoFrame() {
    rafId = null;
    if (!video.duration) return;

    const diff = targetTime - video.currentTime;

    if (Math.abs(diff) > 0.01) {
      video.currentTime += diff * 0.15;
      requestRender();
    } else {
      video.currentTime = targetTime;
    }

    const curr = video.currentTime;

    // 00:02 mark -> Education
    if (educationText) {
      if (curr >= 1.8 && curr < 2.8) {
        educationText.classList.add('is-visible');
      } else {
        educationText.classList.remove('is-visible');
      }
    }

    // 00:03 mark -> Skills
    if (skillsText) {
      if (curr >= 2.8 && curr < 4.2) {
        skillsText.classList.add('is-visible');
      } else {
        skillsText.classList.remove('is-visible');
      }
    }

    // 00:05 mark -> Work Experience
    if (workText) {
      if (curr >= 4.2 && curr <= 6.0) {
        workText.classList.add('is-visible');
      } else {
        workText.classList.remove('is-visible');
      }
    }
  }
});