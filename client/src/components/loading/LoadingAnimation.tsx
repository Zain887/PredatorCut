import React from 'react';

interface Props {
    // Define your component props here
}

const LoadingAnimation: React.FC<Props> = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <svg className='light' width="584" height="468" viewBox="0 0 184 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1846_121)">
                    <rect width="184" height="68" fill="none" />
                    <path className='slideup' d="M1.54119 49V28.6364H9.95312C11.4777 28.6364 12.7936 28.9347 13.9006 29.5312C15.0142 30.1212 15.8726 30.9465 16.4759 32.0071C17.0791 33.0611 17.3807 34.2874 17.3807 35.6861C17.3807 37.0914 17.0724 38.321 16.456 39.375C15.8461 40.4223 14.9744 41.2344 13.8409 41.8111C12.7074 42.3878 11.3617 42.6761 9.80398 42.6761H4.61364V38.7983H8.8892C9.63163 38.7983 10.2514 38.669 10.7486 38.4105C11.2524 38.152 11.6335 37.7907 11.892 37.3267C12.1506 36.8561 12.2798 36.3092 12.2798 35.6861C12.2798 35.0563 12.1506 34.5128 11.892 34.0554C11.6335 33.5914 11.2524 33.2334 10.7486 32.9815C10.2448 32.7296 9.625 32.6037 8.8892 32.6037H6.46307V49H1.54119ZM18.2628 49V28.6364H25.5214C27.099 28.6364 28.4082 28.9081 29.4489 29.4517C30.4963 29.9953 31.2785 30.7476 31.7955 31.7088C32.3126 32.6634 32.5711 33.767 32.5711 35.0199C32.5711 36.2661 32.3092 37.3632 31.7856 38.3111C31.2685 39.2524 30.4863 39.9848 29.439 40.5085C28.3983 41.0322 27.0891 41.294 25.5114 41.294H20.0128V38.6491H25.233C26.2273 38.6491 27.036 38.5066 27.6591 38.2216C28.2889 37.9366 28.7496 37.5223 29.0413 36.9787C29.3329 36.4351 29.4788 35.7822 29.4788 35.0199C29.4788 34.2509 29.3296 33.5848 29.0313 33.0213C28.7396 32.4579 28.2789 32.027 27.6492 31.7287C27.0261 31.4238 26.2074 31.2713 25.1932 31.2713H21.3353V49H18.2628ZM28.3154 39.8125L33.3466 49H29.8466L24.9148 39.8125H28.3154ZM34.0697 49V28.6364H46.8368V31.2812H37.1422V37.4858H46.1706V40.1207H37.1422V46.3551H46.9561V49H34.0697ZM55.2931 49H48.7008V28.6364H55.5019C57.4972 28.6364 59.2108 29.044 60.6426 29.8594C62.0744 30.6681 63.1715 31.8314 63.9338 33.3494C64.7027 34.8608 65.0872 36.6738 65.0872 38.7884C65.0872 40.9096 64.6994 42.7325 63.9238 44.2571C63.1549 45.7817 62.0412 46.955 60.5829 47.777C59.1246 48.5923 57.3613 49 55.2931 49ZM51.7733 46.3153H55.1241C56.6752 46.3153 57.9645 46.0237 58.992 45.4403C60.0195 44.8504 60.7884 43.9986 61.2988 42.8849C61.8092 41.7647 62.0644 40.3991 62.0644 38.7884C62.0644 37.1908 61.8092 35.8352 61.2988 34.7216C60.795 33.608 60.0427 32.7628 59.0417 32.1861C58.0408 31.6094 56.7979 31.321 55.313 31.321H51.7733V46.3153ZM67.3763 49H64.1149L71.4431 28.6364H74.9928L82.3209 49H79.0595L73.3024 32.3352H73.1433L67.3763 49ZM67.9232 41.0256H78.5027V43.6108H67.9232V41.0256ZM111.051 38.8182C111.051 40.9924 110.653 42.8617 109.858 44.4261C109.062 45.9839 107.972 47.1837 106.586 48.0256C105.208 48.8608 103.64 49.2784 101.883 49.2784C100.12 49.2784 98.5456 48.8608 97.1602 48.0256C95.7814 47.1837 94.6943 45.9806 93.8988 44.4162C93.1034 42.8518 92.7057 40.9858 92.7057 38.8182C92.7057 36.6439 93.1034 34.7779 93.8988 33.2202C94.6943 31.6558 95.7814 30.456 97.1602 29.6207C98.5456 28.7789 100.12 28.358 101.883 28.358C103.64 28.358 105.208 28.7789 106.586 29.6207C107.972 30.456 109.062 31.6558 109.858 33.2202C110.653 34.7779 111.051 36.6439 111.051 38.8182ZM108.008 38.8182C108.008 37.161 107.74 35.7656 107.203 34.6321C106.673 33.492 105.943 32.6302 105.015 32.0469C104.094 31.4569 103.05 31.1619 101.883 31.1619C100.71 31.1619 99.6626 31.4569 98.7412 32.0469C97.8198 32.6302 97.0906 33.492 96.5537 34.6321C96.0234 35.7656 95.7582 37.161 95.7582 38.8182C95.7582 40.4754 96.0234 41.8741 96.5537 43.0142C97.0906 44.1477 97.8198 45.0095 98.7412 45.5994C99.6626 46.1828 100.71 46.4744 101.883 46.4744C103.05 46.4744 104.094 46.1828 105.015 45.5994C105.943 45.0095 106.673 44.1477 107.203 43.0142C107.74 41.8741 108.008 40.4754 108.008 38.8182ZM112.641 49V28.6364H119.9C121.478 28.6364 122.787 28.9081 123.828 29.4517C124.875 29.9953 125.657 30.7476 126.174 31.7088C126.691 32.6634 126.95 33.767 126.95 35.0199C126.95 36.2661 126.688 37.3632 126.164 38.3111C125.647 39.2524 124.865 39.9848 123.818 40.5085C122.777 41.0322 121.468 41.294 119.89 41.294H114.391V38.6491H119.612C120.606 38.6491 121.415 38.5066 122.038 38.2216C122.667 37.9366 123.128 37.5223 123.42 36.9787C123.712 36.4351 123.857 35.7822 123.857 35.0199C123.857 34.2509 123.708 33.5848 123.41 33.0213C123.118 32.4579 122.658 32.027 122.028 31.7287C121.405 31.4238 120.586 31.2713 119.572 31.2713H115.714V49H112.641ZM122.694 39.8125L127.725 49H124.225L119.293 39.8125H122.694Z" fill="#918787" />
                    <path className='slideup' d="M147.026 36.0142H142.054C141.988 35.5038 141.852 35.0431 141.646 34.6321C141.441 34.2211 141.169 33.8698 140.831 33.5781C140.493 33.2865 140.092 33.0644 139.628 32.9119C139.17 32.7528 138.663 32.6733 138.107 32.6733C137.119 32.6733 136.267 32.9152 135.551 33.3991C134.842 33.883 134.295 34.5824 133.911 35.4972C133.533 36.4119 133.344 37.5189 133.344 38.8182C133.344 40.1705 133.536 41.304 133.92 42.2188C134.312 43.1269 134.858 43.813 135.561 44.277C136.27 44.7344 137.109 44.9631 138.077 44.9631C138.62 44.9631 139.114 44.8935 139.558 44.7543C140.009 44.6151 140.403 44.4129 140.741 44.1477C141.086 43.8759 141.368 43.5478 141.587 43.1634C141.812 42.7723 141.968 42.3314 142.054 41.8409L147.026 41.8707C146.939 42.7723 146.678 43.6605 146.24 44.5355C145.809 45.4105 145.216 46.2093 144.46 46.9318C143.705 47.6477 142.783 48.2178 141.696 48.642C140.616 49.0663 139.376 49.2784 137.977 49.2784C136.134 49.2784 134.484 48.8741 133.026 48.0653C131.574 47.25 130.427 46.0634 129.585 44.5057C128.743 42.9479 128.322 41.0521 128.322 38.8182C128.322 36.5777 128.75 34.6785 129.605 33.1207C130.46 31.563 131.617 30.3797 133.075 29.571C134.534 28.7623 136.168 28.358 137.977 28.358C139.21 28.358 140.35 28.5303 141.398 28.875C142.445 29.2131 143.366 29.7102 144.162 30.3665C144.957 31.0161 145.604 31.8149 146.101 32.7628C146.598 33.7107 146.906 34.7945 147.026 36.0142ZM161.393 28.6364H164.476V42.0298C164.476 43.455 164.141 44.7178 163.471 45.8182C162.802 46.9119 161.86 47.7737 160.647 48.4034C159.434 49.0265 158.012 49.3381 156.382 49.3381C154.758 49.3381 153.339 49.0265 152.126 48.4034C150.913 47.7737 149.972 46.9119 149.302 45.8182C148.633 44.7178 148.298 43.455 148.298 42.0298V28.6364H151.37V41.7812C151.37 42.7027 151.573 43.5213 151.977 44.2372C152.388 44.9531 152.968 45.5166 153.717 45.9276C154.466 46.3319 155.354 46.5341 156.382 46.5341C157.416 46.5341 158.307 46.3319 159.057 45.9276C159.812 45.5166 160.389 44.9531 160.787 44.2372C161.191 43.5213 161.393 42.7027 161.393 41.7812V28.6364ZM165.698 31.2812V28.6364H181.458V31.2812H175.105V49H172.042V31.2812H165.698Z" fill="white" />
                    <path className="sowrdDrop" d="M84.9844 19.8711L87.4844 22.2711L89.9844 19.8711V58.2711L87.4844 67.8711L84.9844 58.2711V19.8711Z" fill="#918787" />
                    <path className="sowrdDrop" d="M86.8828 21.793L87.4844 22.2711L87.9844 21.793L87.5 67.8711L86.8828 21.793Z" fill="white" />
                    <path className="sowrdDrop" d="M79.054 20.8863C81.3803 19.5321 93.0963 19.5333 95.4557 20.8863C97.8151 22.2392 95.4669 21.789 95.4669 21.789H90.0001L87.5001 22.8711L85.0001 21.6711L79.0652 21.789C79.0652 21.789 76.7277 22.2404 79.054 20.8863Z" fill="white" />
                    <path className="sowrdDrop" d="M86 2.02529C87.1845 -0.834123 87.9789 -0.511246 89 2.02529V19.8724H86V2.02529Z" fill="#D9D9D9" />
                    <path className="sowrdDrop" d="M85.9989 18.0002L89 16.5L89 17.5L86.0006 18.9977L85.9989 18.0002Z" fill="#666666" />
                    <path className="sowrdDrop" d="M85.9989 6.00018L89 4.5L89 5.5L86.0006 6.99774L85.9989 6.00018Z" fill="#666666" />
                    <path className="sowrdDrop" d="M86.0008 2.00219L89.0001 2.00093L89.0001 2.50093L86.0007 3.99868L86.0008 2.00219Z" fill="#666666" />
                    <path className="sowrdDrop" d="M85.9989 12.0002L89 10.5L89 11.5L86.0006 12.9977L85.9989 12.0002Z" fill="#666666" />
                    <path className="sowrdDrop" d="M85.9989 15.0002L89 13.5L89 14.5L86.0006 15.9977L85.9989 15.0002Z" fill="#666666" />
                    <path className="sowrdDrop" d="M85.9989 9.00018L89 7.5L89 8.5L86.0006 9.99774L85.9989 9.00018Z" fill="#666666" />
                </g>
                <line x1="1" y1="58.5" x2="81" y2="58.5" stroke="white" className='lineleft'/>
                <line x1="94" y1="58.5" x2="182" y2="58.5" stroke="white" className='lineright'/>
                <defs>
                    <clipPath id="clip0_1846_121">
                        <rect width="184" height="68" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default LoadingAnimation;