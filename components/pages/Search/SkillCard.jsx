export default function SkillCard({ title, image, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={` relative m-2 w-44 shrink-0 cursor-pointer mx-2 ${
        isActive && 'bg-primary rounded-lg'
      }`}
    >
      <img
        className={` object-fill sm:h-16 h-12 w-full cursor-pointer  ${
          isActive && 'opacity-0'
        }`}
        src={image}
        alt={title}
      />

      <p
        className={` absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center   font-dm-sans leading-[16px] w-full   `}
      >
        {title}
      </p>
    </div>
  )
}
