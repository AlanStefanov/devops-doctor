import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FormattedMessage } from "react-intl";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SidebarNav />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Alan Stefanov
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              DevOps Engineer & Technical Leader
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <Card className="overflow-hidden shadow-sm">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://i.ibb.co/8kDYyG6/1737847325236.jpg"
                  alt="Alan Stefanov"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    asChild
                  >
                    <a 
                      href="https://github.com/AlanStefanov"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiGithub className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    asChild
                  >
                    <a 
                      href="https://www.linkedin.com/in/alanstefanov/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiLinkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="backdrop-blur-sm bg-card/80">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Sobre mi</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Soy un apasionado DevOps Engineer y Líder Técnico con experiencia en el sector público y privado. 
                      Actualmente, me desempeño en una startup donde pongo en práctica mi enfoque proactivo y entusiasta 
                      para liderar equipos y proyectos. Me considero un líder natural, capaz de inspirar y guiar a mi 
                      equipo hacia el éxito en cada iniciativa que emprendemos.
                    </p>
                    <p>
                      Mi trayectoria profesional me ha permitido desarrollar una sólida base en la implementación de 
                      infraestructuras robustas, automatización de procesos y optimización de sistemas en entornos 
                      tanto en la nube como on-premise. Siempre busco innovar y encontrar las mejores soluciones 
                      tecnológicas para los desafíos que enfrentamos.
                    </p>
                    <p>
                      Fuera del trabajo, me encanta aprender sobre nuevas tecnologías y compartir mis conocimientos 
                      con la comunidad. ¡Siempre estoy dispuesto a colaborar en proyectos interesantes y desafiantes!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/80">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">DevOps Doctor</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    DevOps Doctor es una plataforma de recursos y herramientas para profesionales DevOps,
                    diseñada para compartir conocimientos y mejores prácticas en áreas como CI/CD, 
                    infraestructura como código, monitoreo y seguridad.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
