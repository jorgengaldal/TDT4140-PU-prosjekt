import React from 'react';

interface PhotoProps {
    width: string;
    height: string;
    imageUrl: string;
}

const Photo: React.FC<PhotoProps> = ({ width, height, imageUrl }) => {
    return (
        <div className={`bg-orange-500 rounded-lg h-[${height}px] w-[${width}px]`}>
            <img src={imageUrl} alt="Movie Photo" className="w-full h-full object-cover" />
        </div>
    );
};
export default Photo;
