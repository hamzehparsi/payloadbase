import { IconAlertSquareRounded } from '@tabler/icons-react'
import { ArrowUpRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export default function EmptyDemo() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconAlertSquareRounded />
          </EmptyMedia>
          <EmptyTitle>با عرض پوزش</EmptyTitle>
          <EmptyDescription>نتونستم صفحه مورد نظرت رو پیدا کنم </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button>بازگشت</Button>
            <Button variant="outline">صفحه اصلی</Button>
          </div>
        </EmptyContent>
        {/* <Button variant="link" asChild className="text-muted-foreground" size="sm">
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button> */}
      </Empty>
    </div>
  )
}
