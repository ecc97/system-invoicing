import React from 'react'

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}
