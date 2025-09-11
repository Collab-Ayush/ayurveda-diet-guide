import { Leaf } from 'lucide-react'

export const LeafAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Leaf 1 */}
      <div className="absolute top-0 left-1/4 animate-leaf-fall-1">
        <Leaf className="w-8 h-8 text-green-500 transform rotate-12" />
      </div>
      
      {/* Leaf 2 */}
      <div className="absolute top-0 left-1/2 animate-leaf-fall-2" style={{ animationDelay: '0.5s' }}>
        <Leaf className="w-6 h-6 text-green-600 transform -rotate-45" />
      </div>
      
      {/* Leaf 3 */}
      <div className="absolute top-0 left-3/4 animate-leaf-fall-3" style={{ animationDelay: '1s' }}>
        <Leaf className="w-10 h-10 text-green-400 transform rotate-90" />
      </div>
      
      {/* Leaf 4 */}
      <div className="absolute top-0 left-1/6 animate-leaf-fall-4" style={{ animationDelay: '1.5s' }}>
        <Leaf className="w-7 h-7 text-green-700 transform -rotate-12" />
      </div>
      
      {/* Leaf 5 */}
      <div className="absolute top-0 left-5/6 animate-leaf-fall-5" style={{ animationDelay: '2s' }}>
        <Leaf className="w-9 h-9 text-green-500 transform rotate-180" />
      </div>
      
      {/* Leaf 6 */}
      <div className="absolute top-0 left-2/3 animate-leaf-fall-6" style={{ animationDelay: '0.8s' }}>
        <Leaf className="w-5 h-5 text-green-600 transform rotate-45" />
      </div>
      
      {/* Leaf 7 */}
      <div className="absolute top-0 left-1/3 animate-leaf-fall-7" style={{ animationDelay: '2.5s' }}>
        <Leaf className="w-8 h-8 text-green-400 transform -rotate-90" />
      </div>
    </div>
  )
}