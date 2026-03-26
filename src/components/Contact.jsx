function Contact(){
    return (
        <section className ="contact-section" data-theme="dark">

            <p className="contact-eyebrow">GET IN TOUCH</p>

            <h2 className="contact-heading">
                Let's <br/> Connect.
            </h2>

            <p className="contact-subtext">
                Whether you want to collaborate, say hello, or just have a conversation,
                <br/>I'd love to hear from you.
            </p>

            <a href="malito:evelisekguenda@gmail.com" className="contact-email">
                evelisekguenda@gmail.com
            </a>

            <a href="malito:evelisekguenda@gmail.com" className="contact-btn">
                SEND AN EMAIL
            </a>

            <div className="contact-socials">
                <a href="https://www.tiktok.com/@eve.guenda" className="social-btn">TIKTOK</a>
                <a href="#" className="social-btn">INSTAGRAM</a>
                <a href="https://www.pinterest.com/eveguenda/" className="social-btn">PINTEREST</a>
                <a href="https://github.com/evydsg" target="_blank" rel="noreferrer" className="social-btn">GITHUB</a>
            </div>

            <div className="contact-footer">
                <p className="contact-shalom">Shalom, Shalom</p>
                <p className="contact-copyright">
                    © 2026 Evelise Guenda. All rights reserved. <br />
                    Designed with ❤️ and a lot of tea.
                </p>
            </div>
        </section>
    );
}
export default Contact;