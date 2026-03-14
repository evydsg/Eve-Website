function Pinterest(){
    const boards = [{
        name: "Bible Study",
        url: "https://www.pinterest.com/eveguenda/bible-study/",
        emoji: "📖"},
    
        {
            name: "Books",
            url:"https://www.pinterest.com/eveguenda/books/",
            emoji: "📚",

        },
        {
            name: "Gym",
            url: "https://www.pinterest.com/eveguenda/gym/",
            emoji: "🏋️",
        },
        {
            name: "Nails",
            url: "https://www.pinterest.com/eveguenda/nails/",
            emoji: "💅",
          },
          {
            name: "OTD",
            url: "https://www.pinterest.com/eveguenda/otd/",
            emoji: "🪞",
          },
    ];

    return (
        <section className="pinterest" id="pinterest" data-theme="pinterest">

            <p className="pinterest-outer-label">Pinterest</p>

            <div className="pinterest-card">

                <div className="pinterest-header">
                    <h2 className="pinterest-title">Pinterest Boards</h2>
                </div>

                <div className="pinterest-grid">
                    {boards.map((board) => (
                        <a 
                        key={board.name}
                        href={board.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pinterest-board-card">
                            <span className="pinterest-board-emoji">{board.emoji}</span>
                            <span className="pinterest-board-name">{board.name}</span>
                        </a>
                    ))}
                </div>

                <div className="pinterest-cta-wrapper">
                    <a
                    href="https://www.pinterest.com/eveguenda/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pinterest-cta">
                        SEE ALL BOARDS
                    </a>
                </div>
            </div>
        </section>
    );

}
export default Pinterest;