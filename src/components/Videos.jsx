function Videos() {
  return (
    <section className="videos" id="videos" data-theme="dark">

      {/* Outer floating label — sits above the red card */}
      <p className="tiktok-outer-label"></p>

      <div className="tiktok-card">

        {/* ── RED HEADER ── */}
        <div className="tiktok-header">
          <p className="tiktok-handle">@eve.guenda</p>
          <h2 className="tiktok-title">TikTok</h2>
        </div>

        {/* ── BLACK VIDEO GRID ── */}
        <div className="tiktok-body">

          <div className="tiktok-grid">
            {/* Replace src with real embed URLs when ready */}
            {/* ✅ Real TikTok embed */}
            <div className="tiktok-video-card">
              <iframe
                //src="https://www.tiktok.com/embed/v2/7565625106928618808"
                src = "https://www.tiktok.com/embed/7565625106928618808"
                allowFullScreen
                title="TikTok video 1"
              />
            </div>

            {/* Placeholder — swap with next video URL when ready */}
            <div className="tiktok-video-card">
              <div className="tiktok-video-placeholder" />
            </div>

            {/* Placeholder — swap with next video URL when ready */}
            <div className="tiktok-video-card">
              <div className="tiktok-video-placeholder" />
            </div>
          </div>

          <a
            href="https://www.tiktok.com/@eve.guenda"
            target="_blank"
            rel="noopener noreferrer"
            className="tiktok-cta"
          >
            FOLLOW ON TIKTOK
          </a>

        </div>
      </div>
    </section>
  );
}

export default Videos;