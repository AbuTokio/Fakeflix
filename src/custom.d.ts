declare module "*.svg" {
  import * as React from "react"

  // Export für "import { ReactComponent as Icon } from './icon.svg';"
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  // Export für "import iconUrl from './icon.svg';"
  const src: string
  export default src
}
