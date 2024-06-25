export default {
  root: {
      class: [
          // Sizing and Shape
          'min-w-[12rem]',
          'rounded-md',
          // Spacing
          'py-2',
          'text-sm',
          // Colors
          'bg-surface-50 dark:bg-surface-900',
          'text-surface-500 dark:text-white/80',
      ]
  },
  menu: {
      class: [
          // Spacings and Shape
          'list-none',
          'space-y-2',
          'm-0',
          'p-0',
          'outline-none'
      ]
  },
  content: () => ({
      class: [
          //Shape
          'rounded-lg',
          // Colors
          'text-surface-500 dark:text-surface-0',

          // Transitions
          'transition-shadow',
          'duration-200',
          // States
          'hover:text-surface-500 dark:hover:text-surface-100',
          'hover:bg-surface-100 dark:bg-surface-900 dark:hover:bg-surface-700'
      ]
  }),
  action: () => ({
      class: [
          'relative',
          // Flexbox

          'flex',
          'items-center',
          'gap-3',
          'rounded-lg',


          // Spacing
          'py-3',
          'px-5',

          // Misc
          'no-underline',
          'overflow-hidden',
          'cursor-pointer',
          'select-none'
      ]
  }),
  icon: () => ({
      class: [
          // Spacing
          'mr-2',
      ]
  }),
  label: {
      class: [
        'leading-none',
    ]
  },
  submenuheader: {
      class: [
          // Font
          // Spacing
          'm-0',
          'py-3 px-5',
          // Shape
          'rounded-tl-none',
          'rounded-tr-none',
          // Colors
          'bg-surface-0 dark:bg-surface-700',
          'text-surface-500 dark:text-white'
      ]
  },
  transition: {
      enterFromClass: 'opacity-0 scale-y-[0.8]',
      enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
      leaveActiveClass: 'transition-opacity duration-100 ease-linear',
      leaveToClass: 'opacity-0'
  }
};
