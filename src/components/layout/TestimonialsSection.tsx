"use client";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { useT } from "@/lib/i18n/client";

const testimonials = [
  {
    text: "Fui passar uma semana em Maresias sem minha prancha e o Wavy Club salvou minha viagem. Reservei uma longboard em 2 minutos e surfei todos os dias.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Lucas Ferreira",
    role: "Surfista amador · São Paulo",
  },
  {
    text: "Perfeito pra quem viaja bastante. Nunca mais me preocupo com despacho de prancha no aeroporto. Chego no destino, reservo e pronto.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Camila Rocha",
    role: "Surfista · Rio de Janeiro",
  },
  {
    text: "Testei uma fish 5'8 antes de comprar a minha. O Wavy Club me poupou muito dinheiro — acabei escolhendo outro shape que funcionou melhor.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Rafael Oliveira",
    role: "Intermediário · Florianópolis",
  },
  {
    text: "A plataforma é muito intuitiva. Filtrei por volume, escolhi uma prancha do Channel Islands e busquei no ponto em 10 minutos. Experiência incrível.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Beatriz Santos",
    role: "Surfista · Ubatuba",
  },
  {
    text: "Minha prancha quebrou um dia antes de uma viagem. Abri o app, reservei uma substituta e não perdi uma onda. Serviço essencial para quem surfa.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Pedro Alves",
    role: "Surfista avançado · Santos",
  },
  {
    text: "As instruções de retirada chegaram por e-mail na hora. Sem stress, sem ligação, só surf. Melhor assinatura que já fiz.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Ana Lima",
    role: "Surfista · Itacaré",
  },
  {
    text: "Uso o Wavy Club toda vez que vou pra Floripa visitar família. Economizo no despacho e ainda testo pranchas novas. Recomendo demais.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Thiago Mendes",
    role: "Surfista · Curitiba",
  },
  {
    text: "Tava querendo começar a surfar e pude testar diferentes volumes sem precisar comprar. Foi fundamental pra eu evoluir mais rápido.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Fernanda Costa",
    role: "Iniciante · Campinas",
  },
  {
    text: "O calendário de disponibilidade em tempo real é genial. Nada de mandar mensagem esperando resposta. Reservei e surfei no mesmo dia.",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    name: "Diego Carvalho",
    role: "Surfista · Recife",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  const { t } = useT();
  return (
    <section className="bg-background py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-[540px] mx-auto mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
            {t.testimonials.label}
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            {t.testimonials.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t.testimonials.subheading}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={16}
          />
        </div>
      </div>
    </section>
  );
}
