export default function CollectionsFilters() {
    return (
        <div className={"flex flex-col gap-1 pt-3"}>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Phantom</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Spring</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Winter</label>
            </div>
        </div>
    )
}