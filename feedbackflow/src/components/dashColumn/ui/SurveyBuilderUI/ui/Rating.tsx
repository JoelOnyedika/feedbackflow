/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vrgvcjod6iM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import StarIcon from '@/components/custom/StarIcon'
export default function Rating () {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-2xl px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              What do you think about this application so far?
            </h2>
          </div>
          <div className="flex justify-center gap-2">
            <StarIcon className="h-8 w-8 fill-yellow-500" />
            <StarIcon className="h-8 w-8 fill-yellow-500" />
            <StarIcon className="h-8 w-8 fill-yellow-500" />
            <StarIcon className="h-8 w-8 fill-yellow-500" />
            <StarIcon className="h-8 w-8 fill-yellow-500" />
          </div>
        </div>
      </div>
    </section>
  )
}