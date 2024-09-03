export default function SportsFilters() {
    return (
        <div className={"flex flex-col gap-1 pt-3"}>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Lifestyle</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Ćwiczenia i trening</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Piłka Nożna</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Marsz</label>
            </div>
        </div>
    )
}