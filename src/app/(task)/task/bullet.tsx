export default function BulletChart({ value }: { value: number }) {
    // logged of 1 - cosine similarity
    console.log("cosine similarity", value);
    const loggedValue = Math.log(value);
    console.log("loggedValue", loggedValue);
    const oneMinusLoggedValue = 1 - loggedValue;
    console.log("oneMinusLoggedValue", oneMinusLoggedValue);
    // absolute value of the output of logged of (1 - cosine similarity) 
    const loggedOneMinusValue = Math.log(oneMinusLoggedValue);
    console.log("loggedOneMinusValue", loggedOneMinusValue);
    const absoluteValue = Math.abs(loggedOneMinusValue);
    console.log("absoluteValue", absoluteValue);
    // divide by 2 
    const dividedValue = absoluteValue / 1.1;
    console.log("dividedValue", dividedValue);
    const minValue = 0.01;
    const maxValue = 1.54;
    const normalizedValue = (dividedValue - minValue) / (maxValue - minValue);
    console.log("normalizedValue", normalizedValue);
    const getColor = (val: number) => {
        if (val <= 0.4) return "bg-red-600";
        if (val <= 0.8) return "bg-yellow-600";
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

