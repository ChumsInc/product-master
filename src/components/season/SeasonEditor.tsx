import SeasonList from "@/components/season/SeasonList.tsx";

export default function SeasonEditor() {
    return (
        <div>
            <h3>Seasons Editor</h3>
            <SeasonList onSelect={() => {}} />
        </div>
    )
}
