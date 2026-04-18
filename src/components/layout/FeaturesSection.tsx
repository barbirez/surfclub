"use client";
import { motion, type Variants } from "motion/react";
import { Search, CalendarCheck, ShieldCheck, Droplets, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/ui/feature-card";

const features = [
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: "Encontre a prancha certa",
    description:
      "Filtre por tipo, volume, shaper, localização e nível de surf. Cada prancha tem um perfil de condições para você escolher com confiança.",
  },
  {
    icon: <CalendarCheck className="h-6 w-6 text-accent" />,
    title: "Reserva em segundos",
    description:
      "Calendário de disponibilidade em tempo real. Selecione as datas, confirme e pronto. Nada de ligar ou mandar mensagem.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
    title: "Transparência total",
    description:
      "Antes de confirmar, você vê todos os termos, instruções de retirada e devolução. Sem surpresas.",
  },
  {
    icon: <Droplets className="h-6 w-6 text-blue-400" />,
    title: "Specs que importam",
    description:
      "Volume, tamanho, shaper — e o mais importante: para qual nível e condição de mar cada prancha foi feita.",
  },
  {
    icon: <MapPin className="h-6 w-6 text-purple-500" />,
    title: "Ponto de retirada claro",
    description:
      "Cada prancha tem instruções precisas de onde buscar e devolver. Você recebe tudo por e-mail ao confirmar.",
  },
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: "Assinatura flexível",
    description:
      "Plano mensal. Reserve quantas vezes quiser durante o mês. Cancele quando quiser, sem fidelidade.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Funcionalidades</Badge>
        <h2 className="text-3xl font-bold">Tudo que você precisa para surfar bem</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Do filtro até a devolução — uma experiência simples e completa.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={itemVariants}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
