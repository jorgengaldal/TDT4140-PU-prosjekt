import React from 'react';

interface PhotoProps {
    width: string;
    height: string;
}

const Photo: React.FC<PhotoProps> = ({ width, height }) => {
    return (
        <div className={`bg-orange-500 rounded-lg h-[${height}px] w-[${width}px]`}>
            <p className="h-[75%]">Insert photo here</p>
        </div>
    );
};

export default Photo;
