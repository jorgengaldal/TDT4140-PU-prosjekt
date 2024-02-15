"use client";

import Photo from "./Photo";

export default function FilmInfo() {
    return (
        <div className="w-2/3 mt-10 bg-accent1 rounded-t-lg h-[800px]">
            <div className="flex flex-row">
                <div className="p-4 w-1/3">
                    <Photo width="150" height="200"/>
                </div>
                <div className="p-4 w-2/3">
                    <p>DUMMYT TEXT</p>
                </div>
            </div>

            <div className="w-full relative inset-x-0 bottom-0 bg-blue-500 rounded-lg h-[25%]">
                <p>This is the bottom</p>
            </div>
        </div>
    )
}