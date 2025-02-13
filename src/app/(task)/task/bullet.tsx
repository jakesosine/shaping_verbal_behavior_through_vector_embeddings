export default function BulletChart({ normalizedValue }: { normalizedValue: number }) {
    console.log("normalizedValue", normalizedValue);

    const getColor = (val: number) => {
        if (val <= 0.61) return "bg-red-600";
        if (val <= 0.82) return "bg-yellow-600";
        return "bg-green-600";
    };

    return (
        <div className="relative w-full h-6 bg-gray-300 rounded">
            <div
                className={`h-full rounded ${getColor(normalizedValue)}`}
                style={{ width: `${normalizedValue * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex justify-center items-center text-blue-900 font-semibold">
            </div>
        </div>
    );
};

