function Videos() {
    return (
      <section className="videos" id="videos" data-theme="red">
  
        <p className="tiktok-outer-label">TikTok</p>
  
        <div className="tiktok-card">
  
          <div className="tiktok-header">
            <p className="tiktok-handle">@eve.guenda</p>
            <h2 className="tiktok-title">TikTok</h2>   {/* ✅ fixed typo */}
          </div>
  
          <div className="tiktok-body">                 {/* ✅ grid + CTA both inside */}
            <div className="tiktok-grid">               {/* ✅ all 3 cards inside grid */}
              <div className="tiktok-video-card">
                <div className="tiktok-video-placeholder" />
              </div>
              <div className="tiktok-video-card">
                <div className="tiktok-video-placeholder" />
              </div>
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