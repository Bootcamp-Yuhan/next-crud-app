import Image from 'next/image';
import React from 'react';

interface OnCardClickProps {
    urlPath: string;
}

interface MenuProps {
    imageUrl: string;
    title: string;
    urlPath: string;
    onCardClick: ({ urlPath }: OnCardClickProps) => void;
}

export default function Menu({ imageUrl, title, urlPath, onCardClick }: MenuProps) {

    const handleCardClick = () => {
        onCardClick({ urlPath });
    };

    return (
        <>
            <div className="col mb-4">
                <div className="card" onClick={handleCardClick}>
                    <Image src={imageUrl} className="card-img-top" alt="..." width={180} height={180} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}