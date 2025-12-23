import { ImageIcon, ListIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs.tsx'

export const VIEW_MODES = ['list', 'cards'] as const
export type ViewMode = (typeof VIEW_MODES)[number]

export function ViewModeToggle({ value, onChange }: { value: ViewMode; onChange: (value: ViewMode) => void }) {
    return (
        <Tabs defaultValue={value}>
            <TabsList>
                {VIEW_MODES.map((tab) => (
                    <TabsTrigger key={tab} value={tab} onClick={(_evt) => onChange(tab)}>
                        {tab === 'list' ? <ListIcon /> : <ImageIcon />}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
