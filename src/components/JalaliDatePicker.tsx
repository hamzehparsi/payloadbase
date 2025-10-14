// components/JalaliDatePicker.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import moment from 'moment-jalaali'

interface JalaliDatePickerProps {
  path: string
}

const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({ path }) => {
  const { value, setValue } = useField<string>({ path })
  const [selectedDay, setSelectedDay] = useState<DayValue>(null)
  const [timeValue, setTimeValue] = useState('00:00')

  // تبدیل ISO date به تاریخ شمسی
  useEffect(() => {
    if (value) {
      const m = moment(value)

      setSelectedDay({
        year: m.jYear(),
        month: m.jMonth() + 1, // jMonth() از 0 شروع می‌شود
        day: m.jDate(),
      })

      setTimeValue(m.format('HH:mm'))
    } else {
      // مقدار پیش‌فرض (امروز)
      const now = moment()

      setSelectedDay({
        year: now.jYear(),
        month: now.jMonth() + 1,
        day: now.jDate(),
      })

      setTimeValue(now.format('HH:mm'))
    }
  }, [value])

  // تبدیل تاریخ شمسی به میلادی و ذخیره
  const handleDateChange = (day: DayValue) => {
    setSelectedDay(day)
    if (day) {
      updateValue(day, timeValue)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTimeValue(newTime)
    if (selectedDay) {
      updateValue(selectedDay, newTime)
    }
  }

  const updateValue = (day: DayValue, time: string) => {
    if (!day) return

    const [hours, minutes] = time.split(':').map(Number)

    // ساخت تاریخ میلادی از تاریخ شمسی با moment-jalaali
    const m = moment(`${day.year}/${day.month}/${day.day} ${hours}:${minutes}`, 'jYYYY/jM/jD HH:mm')

    setValue(m.toISOString())
  }

  return (
    <div className="field-type date" style={{ marginBottom: '1.5rem' }}>
      <label
        className="field-label"
        style={{ marginBottom: '0.5rem', display: 'block', fontWeight: 600 }}
      >
        تاریخ انتشار
      </label>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <DatePicker
            value={selectedDay}
            onChange={handleDateChange}
            locale="fa"
            calendarClassName="custom-calendar"
            inputPlaceholder="انتخاب تاریخ"
            shouldHighlightWeekends
          />
        </div>

        <div style={{ width: '120px' }}>
          <input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      <div
        className="field-description"
        style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}
      >
        تاریخ و زمان انتشار خبر (شمسی)
      </div>
    </div>
  )
}

export default JalaliDatePicker
