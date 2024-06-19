import { useParams } from "react-router-dom";
import { defaultTestUser } from "../main";

interface ItemProps {
    name: string,
    url: string,
    description: string,
    price: string
}

export function ItemCard({ name, url, description, price }: ItemProps) {
    const { id } = useParams()
    const shoeId = id
    const userId = defaultTestUser.id

    const addToFavorites = () => {
        const data = {
            userId: userId,
            shoeId: shoeId
        }

        fetch(`http://localhost:4000/favorite/user/shoe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then((data) => {
            console.log('boop')
            console.log('hello', data)
        }).catch((error) => {
            console.log('error')
            const errorCode = error.code;
            const errorMessage = error.message;
        });


    }
    return (
        <>
            <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border !text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                        src={url}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {name}
                        </p>
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {price}
                        </p>
                    </div>
                    <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                        {description}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                        className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-103 focus:opacity-[0.65] active:scale-100 active:opacity-[0.65] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={addToFavorites}
                    >
                        Add to favorites
                    </button>
                </div>
            </div>
        </>

    );
}