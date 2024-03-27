export type LibraryIconProps = {
  [icon in LibraryIconNameString]: (props: LibraryIconItemProps) => JSX.Element
}

export interface LibraryIconItemProps {
  className?: string
  onClick?: () => void
}

export enum LibraryIconName {
  Hammer,
}

export type LibraryIconNameString = keyof typeof LibraryIconName
