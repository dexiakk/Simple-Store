export default function ColorFilters() {
    return (
        <div className={"flex flex-col gap-1 pt-3"}>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Buty typu Low</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Buty typu Mid</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Buty typu High</label>
            </div>
        </div>
    )
}