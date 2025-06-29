const CustomButton = ({
  label,
  handleClick,
  tooltip
}) => {
  return (
    <div className="relative group grid">
      <button
        className={`bg-[#5bb8b8] hover:bg-[#5bb8b881] text-white font-bold p-2 rounded w-24`}
        type="button"
        onClick={handleClick}
      >
        {label}
      </button>
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default CustomButton;