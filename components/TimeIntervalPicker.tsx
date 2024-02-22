'use client'

import React, { type FC, useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronUpIcon, ChevronDownIcon, CheckIcon, ClockIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

export interface TimeIntervalPickerProps {
  onUpdate?: (values: { interval: Interval }) => void
}

interface Preset {
  name: string
  label: string
}

// Define presets
const PRESETS: Preset[] = [
  { name: 'hourly', label: 'Hourly' },
  { name: 'daily', label: 'Daily' },
  { name: 'weekly', label: 'Weekly' },
  { name: 'monthly', label: 'Monthly' }
]

type Interval = 'hourly' | 'daily' | 'weekly' | 'monthly';

export const TimeIntervalPicker: FC<TimeIntervalPickerProps> & {
  filePath: string
} = ({
  onUpdate,
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)

    const [selectedPreset, setSelectedPreset] = useState<Interval>('daily')


    useEffect(() => {
      if (onUpdate) {
        onUpdate({ interval: selectedPreset })
      }
    }, [onUpdate, selectedPreset])

    const PresetButton = ({
      preset,
      label,
      isSelected
    }: {
      preset: string
      label: string
      isSelected: boolean
    }): JSX.Element => (
      <Button
        className={cn(isSelected && 'pointer-events-none')}
        variant="ghost"
        onClick={() => { setSelectedPreset(preset as Interval) }}
      >
        <span className={cn('pr-2 opacity-0', isSelected && 'opacity-70')}>
          <CheckIcon width={18} height={18} />
        </span>
        {label}
      </Button>
    )

    return (
      <Popover modal={true} open={isOpen} onOpenChange={(open: boolean) => {
        if (!open) {
        }
        setIsOpen(open)
      }}>
        <PopoverTrigger asChild>
          <Button size={'lg'} variant="outline">
            <div className="text-right">
              <div className="py-1">
                {/* move the clock down 5 pixels */}
                <div style={{ display: "flex", justifyContent: "center", }}>
                  <ClockIcon className='mt-0.5 mr-3' /><span> Time Interval</span>
                </div>
              </div>
            </div>
            <div className="pl-1 opacity-60 -mr-2 scale-125">
              {
                isOpen ? (<ChevronUpIcon width={24} />) : (<ChevronDownIcon width={24} />)
              }
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="flex py-2">
            {
              <div className="flex flex-col items-end gap-1 pr-2">
                <div className="flex w-full flex-col items-end gap-1 pr-2">
                  {PRESETS.map((preset) => (
                    <PresetButton
                      key={preset.name}
                      preset={preset.name}
                      label={preset.label}
                      isSelected={selectedPreset === preset.name}
                    />
                  ))}
                </div>
              </div>
            }
          </div>
        </PopoverContent>
      </Popover>
    )
  }



TimeIntervalPicker.displayName = 'TimeIntervalPicker'
TimeIntervalPicker.filePath = './TimeIntervalPicker.tsx'
