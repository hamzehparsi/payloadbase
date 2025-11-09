import LinksFooter from '@/components/LinksFooter'
import LinksContents from './LinksContents'
import { toPersianNumber } from '@/utils/persianNumber'

export default function Footer() {
  return (
    <>
      <div className="flex items-start pb-10 gap-10 justify-between">
        <div className="w-3/5">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-brand-dark rounded-full"></div>
            <div className="font-extrabold text-brand">دربـــاره ما</div>
          </div>
          <p className="text-gray-400 text-xs leading-6 tracking-tighter mt-4">
            پنجشنبه شب به وقت محلی، پالایشگاه نفت شِورون ال سگوندو ایالت کالیفرنیا دچار انفجار مهیب
            و آتش‌سوزی عظیمی شد که شعله‌های آن از فاصله چندمایلی قابل مشاهده بود. هنوز علت این
            انفجار و آتش‌سوزی اعلام نشده است، لیکن، از آن‌جا که در بحبوحه‌ی حملات ناتو/اوکراین به
            زیرساخت‌های نفتی روسیه، چنین سانحه‌ی به وقوع پیوسته، برخی ناظران و تحلیل‌گران درباره
            ارتباط این انفجار با تلافی‌جویی روسیه از ناتو، گمانه‌زنی کرده‌اند.
          </p>
        </div>
        <div className="w-1/5">
          <div>
            <div className="flex items-center gap-3">
              <div className="size-2 bg-brand-dark rounded-full"></div>
              <div className="font-extrabold text-brand">پیونــدها</div>
            </div>
            <LinksFooter />
          </div>
        </div>
        <div className="w-1/5">
          <div>
            <div className="flex items-center gap-3">
              <div className="size-2 bg-brand-dark rounded-full"></div>
              <div className="font-extrabold text-brand">پیونــدها</div>
            </div>
          </div>
          <LinksContents />
        </div>
      </div>
      <div className="text-center border-t border-slate-200 p-4 text-gray-400 text-xs leading-6 tracking-tighter mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="">طراحی و توسعه</div>
            <div className="font-extrabold text-brand">
              حفاظت فناوری اطلاعات و اسناد اداره حراست
            </div>
          </div>
          <div className="divide-x divide-slate-200 flex items-center">
            <span className="px-2">
              <div className="flex items-center gap-2">
                <span className="text-brand-gray tracking-wider" dir="ltr">
                  @herasate-aba-abor
                </span>
                <img src="/bale.svg" alt="اداره حراست" className="w-5 h-auto ml-1" />
                <img src="/sor.svg" alt="اداره حراست" className="w-5 h-auto ml-1" />
                <img src="/eita.svg" alt="اداره حراست" className="w-5 h-auto ml-1" />
              </div>
            </span>
            <span className="px-2">آذر ماه {toPersianNumber(1404)}</span>
            <span className="px-2">ارتباط با ما</span>
            <span className="px-2">{toPersianNumber(82542)}</span>
          </div>
        </div>
      </div>
    </>
  )
}
