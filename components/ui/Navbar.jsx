'use client'

export default function Navbar(){
    return (
        <div className="flex bg-neutral-800 p-5 border-b-4 items-center justify-between">
            <div className="flex flex-row items-center">
                <img src="/icon.png" alt="icon" className="w-15 h-15"/>
                <span>ALBION ONLINE ECONOMY</span>
            </div>
            <div className="flex gap-3">
                <a href="/" className="p-2 bg-blue-700 rounded-md hover:bg-blue-900 cursor-pointer ">Craft Calculator</a>
                <a href="/food-calculator" className="p-2 bg-blue-700 rounded-md hover:bg-blue-900 cursor-pointer">Food Calculator</a>
                <a href="/laborer-calculator" className="p-2 bg-blue-700 rounded-md hover:bg-blue-900 cursor-pointer">Laborer Calculator</a>
            </div>
        </div>
    )
}