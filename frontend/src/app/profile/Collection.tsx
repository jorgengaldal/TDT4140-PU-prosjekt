import Icons from "@/components/General/Icons";
import Link from "next/link";

interface CollectionProps {
    title: string;
    link: string;
}

const Rectangle: React.FC = () => {
    return <div className="w-[140px] h-[210px] bg-white m-2"></div>;
};

const Collection: React.FC<CollectionProps> = ({ title, link }) => {
    return (
        <div className="flex flex flex-col items-center pb-12">
            <div className="flex justify-between w-full">
                <h1 className="text-xl underline">{title}</h1>
                <Link href={link}>
                <h1 className="text-sm flex items-center">
                    Show more
                    <Icons name="RightArrow"/>
                </h1>
                </Link>
            </div>
            <div className="flex">
                <Rectangle />
                <Rectangle />
                <Rectangle />
                <Rectangle />
            </div>
        </div>
    );
};

export default Collection;