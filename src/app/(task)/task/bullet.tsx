export default function BulletChart({ value }: { value: number }) {
    const cappedValue = Math.max(0, Math.min(1, value));

    const getColor = (val: number) => {
        if (val <= 0.4) return "bg-red-600";
        if (val <= 0.8) return "bg-yellow-600";
        return "bg-green-600";
    };

    return (
        <div className="relative w-full h-6 bg-gray-300 rounded">
            <div
                className={`h-full rounded ${getColor(cappedValue)}`}
                style={{ width: `${cappedValue * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex justify-center items-center text-blue-900 font-semibold">
                {value}
            </div>
            <div
                className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-green-900"
                style={{ height: "100%" }}
            ></div>
        </div>
    );
};
