import Image from "next/image"

function LoadingOverlay() {
    return <>
        <div className="absolute top-0 right-0 w-full h-full bg-black opacity-70">

        </div>
        <div className="absolute top-0 right-0 w-full h-full flex justify-center align-middle">
            <Image
                className="m-auto rounded-2xl"
                src="/loader.gif"
                alt="Loading..."
                width={150}
                height={50}
                priority
            />
        </div>
    </>
}

export { LoadingOverlay }