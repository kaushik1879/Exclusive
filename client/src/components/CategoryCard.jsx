import React from "react";

const CategoryCard = ({ icon, name }) => {
    return (
        <div className="w-[170px] h-[145px] border border-black/30 px-6 py-3 rounded-sm flex flex-col items-center justify-center gap-2 cursor-pointer">
            <div className="w-[56px] h-[56px]">
                <img
                    src={icon}
                    alt={name}
                    className="w-full h-full object-contain"
                />
            </div>

            <h4 className="text-sm font-medium leading-6 text-center">
                {name}
            </h4>
        </div>
    );
};

export default CategoryCard;
