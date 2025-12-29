export type SelectModifier = 'replace' | 'add' | 'toggle'
export type Selection = Set<string>

export function selectItems(viewState: Set<string>, ids: string[], modif: SelectModifier): Selection {
    switch (modif) {
        case 'replace':
            return new Set(ids)
        case 'add':
            return new Set([...viewState, ...ids])
        case 'toggle': {
            const currentIds = new Set(viewState)
            const newIds = new Set([...ids])

            const base = [...viewState].filter((id) => !newIds.has(id))
            const added = ids.filter((id) => !currentIds.has(id))

            return new Set([...base, ...added])
        }
    }
}
