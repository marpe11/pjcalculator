import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CLT vs PJ Calculator</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Decisões Financeiras{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Baseadas em Dados
            </span>
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Ferramenta profissional para calcular o custo real da contratação CLT e a equivalência salarial para PJ.
            Tome decisões informadas com transparência total.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="mx-auto mt-16 max-w-3xl">
          {/* Feature 1: Company Cost Calculator */}
          <Card className="group relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader className="relative">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Calculator className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">Calculadora CLT vs PJ</CardTitle>
              <CardDescription className="text-base">
                Calcule o custo CLT e a equivalência PJ em uma única ferramenta. Insira os dados uma vez e veja ambos os resultados.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Custo total para a empresa (CLT)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Faturamento necessário como PJ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Comparação entre MEI e Simples Nacional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Detalhamento completo de todos os custos</span>
                </li>
              </ul>
              <Button 
                onClick={() => navigate("/calculadora")}
                className="w-full group/btn"
                size="lg"
              >
                Acessar Calculadora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mx-auto mt-16 max-w-3xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-center">Por que usar esta calculadora?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Para Empresas:</strong> Entenda o custo real de cada contratação CLT e compare com alternativas de contratação PJ de forma transparente e completa.
              </p>
              <p>
                <strong className="text-foreground">Para Profissionais:</strong> Negocie sua transição de CLT para PJ com confiança, sabendo exatamente quanto precisa faturar para não ter perdas financeiras.
              </p>
              <p className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
                <strong className="text-primary">100% Privado:</strong> Todos os cálculos são feitos localmente no seu navegador. Nenhum dado é coletado ou armazenado.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Ferramenta gratuita para análise financeira CLT vs PJ. Consulte sempre um contador para decisões oficiais.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
