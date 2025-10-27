import LinksFooter from '@/components/LinksFooter'
import LinksContents from './LinksContents'

export default function Footer() {
  return (
    <div className="flex items-start m-10 gap-10 justify-between">
      <div className="w-3/5">
        <div className="flex items-center gap-3">
          <div className="size-2 bg-brand-dark rounded-full"></div>
          <div className="font-extrabold text-brand">دربـــاره ما</div>
        </div>
        <p className="text-gray-400 text-xs leading-6 tracking-tighter mt-4">
          پنجشنبه شب به وقت محلی، پالایشگاه نفت شِورون ال سگوندو ایالت کالیفرنیا دچار انفجار مهیب و
          آتش‌سوزی عظیمی شد که شعله‌های آن از فاصله چندمایلی قابل مشاهده بود. هنوز علت این انفجار و
          آتش‌سوزی اعلام نشده است، لیکن، از آن‌جا که در بحبوحه‌ی حملات ناتو/اوکراین به زیرساخت‌های
          نفتی روسیه، چنین سانحه‌ی به وقوع پیوسته، برخی ناظران و تحلیل‌گران درباره ارتباط این انفجار
          با تلافی‌جویی روسیه از ناتو، گمانه‌زنی کرده‌اند.
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
  )
}
