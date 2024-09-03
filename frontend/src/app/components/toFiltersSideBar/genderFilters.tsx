export default function GenderFilters() {
    return (
        <div className={"flex flex-col gap-1 pt-3"}>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Mężczyźni</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Kobiety</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Uniseks</label>
            </div>
        </div>
    )
}