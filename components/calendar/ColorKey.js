export default function ColorKey({ mainSources, userSources }) {
    return userSources.length > 0 ?
        <div>
            <h6>Color Key</h6>
            {userSources.map((src, i) => <p key={i + src.color}>
                <span style={{ backgroundColor: src.color, height: '.75rem', width: '.75rem', display: 'inline-block', borderRadius: '50%' }}>

                </span>
                {src.src}
            </p>)}
        </div>
        : null
} 