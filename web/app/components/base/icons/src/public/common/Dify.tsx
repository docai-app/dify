// GENERATE BY script
// DON NOT EDIT IT MANUALLY

import type { IconBaseProps, IconData } from '@/app/components/base/icons/IconBase'
import IconBase from '@/app/components/base/icons/IconBase'
import * as React from 'react'
import data from './Dify.json'

const Icon = React.forwardRef<React.MutableRefObject<SVGElement>, Omit<IconBaseProps, 'data'>>((
    props,
    ref,
) => <IconBase {...props} ref={ref} data={data as IconData} />)

Icon.displayName = 'DocAI'

export default Icon
