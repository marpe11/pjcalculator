import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Calculator, DollarSign, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Calculadora = () => {
  const [salarioBruto, setSalarioBruto] = useState("");
  const [valeRefeicao, setValeRefeicao] = useState("");
  const [valeTransporte, setValeTransporte] = useState("");
  const [planoSaude, setPlanoSaude] = useState("");
  const [outrosBeneficios, setOutrosBeneficios] = useState("");
  const [regimePJ, setRegimePJ] = useState("simples");
  const [resultadoCLT, setResultadoCLT] = useState<any>(null);
  const [resultadoPJ, setResultadoPJ] = useState<any>(null);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const aplicarMascaraMoeda = (valor: string) => {
    // Remove tudo que não é número
    const numero = valor.replace(/\D/g, "");
    // Converte para número e divide por 100 (centavos)
    const valorNumerico = Number(numero) / 100;
    // Formata como moeda
    return valorNumerico.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputMoeda = (valor: string, setter: (v: string) => void) => {
    const valorFormatado = aplicarMascaraMoeda(valor);
    setter(valorFormatado);
  };

  const parseValorMoeda = (valor: string): number => {
    if (!valor) return 0;
    // Remove pontos de milhar e substitui vírgula por ponto
    return parseFloat(valor.replace(/\./g, "").replace(",", ".")) || 0;
  };

  const calcular = () => {
    const salario = parseValorMoeda(salarioBruto);
    const vr = parseValorMoeda(valeRefeicao);
    const vt = parseValorMoeda(valeTransporte);
    const ps = parseValorMoeda(planoSaude);
    const outros = parseValorMoeda(outrosBeneficios);

    if (salario <= 0) {
      alert("Por favor, insira um salário válido.");
      return;
    }

    // ========== CÁLCULO CLT ==========
    const inss = salario * 0.08;
    const fgts = salario * 0.08;
    const decimoTerceiro = salario;
    const ferias = salario;
    const umTercoFerias = salario / 3;

    const totalEncargosMensal = inss + fgts;
    const totalEncargosAnual = (inss + fgts) * 12 + decimoTerceiro + ferias + umTercoFerias;

    const beneficiosMensais = vr + vt + ps + outros;
    const beneficiosAnual = beneficiosMensais * 12;

    const custoMensal = salario + totalEncargosMensal + beneficiosMensais;
    const custoAnual = salario * 12 + totalEncargosAnual + beneficiosAnual;

    setResultadoCLT({
      salario,
      inss,
      fgts,
      decimoTerceiro,
      ferias,
      umTercoFerias,
      totalEncargosMensal,
      totalEncargosAnual,
      beneficiosMensais,
      beneficiosAnual,
      custoMensal,
      custoAnual,
    });

    // ========== CÁLCULO PJ ==========
    const salarioAnual = salario * 12;
    const fgtsAnual = salarioAnual * 0.08;

    const pacoteAnualCLT = salarioAnual + decimoTerceiro + ferias + umTercoFerias + fgtsAnual + beneficiosAnual;
    const baseMensalPJ = pacoteAnualCLT / 12;

    let nomeRegime = "";
    let faturamentoPJMensal = 0;
    let impostoMensal = 0;

    if (regimePJ === "mei") {
      const impostoFixoMEI = 84;
      faturamentoPJMensal = baseMensalPJ + impostoFixoMEI;
      impostoMensal = impostoFixoMEI;
      nomeRegime = "MEI (R$ 84,00 fixo)";
    } else {
      const aliquotaImposto = 0.06;
      faturamentoPJMensal = baseMensalPJ / (1 - aliquotaImposto);
      impostoMensal = faturamentoPJMensal * aliquotaImposto;
      nomeRegime = "Simples Nacional (6%)";
    }

    const salarioMaisBeneficios = ((salarioAnual + decimoTerceiro + ferias + umTercoFerias) / 12) + beneficiosMensais;
    const compensacaoFGTS = fgtsAnual / 12;

    setResultadoPJ({
      nomeRegime,
      faturamentoPJMensal,
      impostoMensal,
      salarioMaisBeneficios,
      compensacaoFGTS,
      beneficiosMensais,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            Calculadora CLT vs PJ
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Preencha os dados do salário e benefícios para ver tanto o <strong>custo total para a empresa</strong> quanto o <strong>valor equivalente PJ</strong>.
          </AlertDescription>
        </Alert>

        {/* Formulário */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Dados do Contrato
            </CardTitle>
            <CardDescription>Insira as informações do salário e benefícios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="salarioBruto">Salário Bruto Mensal (CLT)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input
                  id="salarioBruto"
                  placeholder="0,00"
                  value={salarioBruto}
                  onChange={(e) => handleInputMoeda(e.target.value, setSalarioBruto)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valeRefeicao">Vale Refeição/Alimentação</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input
                    id="valeRefeicao"
                    placeholder="0,00"
                    value={valeRefeicao}
                    onChange={(e) => handleInputMoeda(e.target.value, setValeRefeicao)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valeTransporte">Vale Transporte</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input
                    id="valeTransporte"
                    placeholder="0,00"
                    value={valeTransporte}
                    onChange={(e) => handleInputMoeda(e.target.value, setValeTransporte)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="planoSaude">Plano de Saúde</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input
                    id="planoSaude"
                    placeholder="0,00"
                    value={planoSaude}
                    onChange={(e) => handleInputMoeda(e.target.value, setPlanoSaude)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outrosBeneficios">Outros Benefícios</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input
                    id="outrosBeneficios"
                    placeholder="0,00"
                    value={outrosBeneficios}
                    onChange={(e) => handleInputMoeda(e.target.value, setOutrosBeneficios)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regimePJ">Regime de Tributação PJ</Label>
              <Select value={regimePJ} onValueChange={setRegimePJ}>
                <SelectTrigger id="regimePJ">
                  <SelectValue placeholder="Selecione o regime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mei">MEI (R$ 84,00 fixo/mês)</SelectItem>
                  <SelectItem value="simples">Simples Nacional - Serviços (6%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calcular} className="w-full" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Calcular Custo e Equivalência
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        {resultadoCLT && resultadoPJ && (
          <div className="space-y-6">
            {/* Resultado CLT */}
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <DollarSign className="h-5 w-5" />
                  Custo Total para a Empresa (CLT)
                </CardTitle>
                <CardDescription>Quanto a empresa gasta com este funcionário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Custo Mensal</p>
                    <p className="text-2xl font-bold text-primary">{formatarMoeda(resultadoCLT.custoMensal)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Custo Anual</p>
                    <p className="text-2xl font-bold text-primary">{formatarMoeda(resultadoCLT.custoAnual)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Detalhamento:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">Salário Bruto</span>
                      <span className="font-medium">{formatarMoeda(resultadoCLT.salario)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">INSS (8%)</span>
                      <span className="font-medium">{formatarMoeda(resultadoCLT.inss)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">FGTS (8%)</span>
                      <span className="font-medium">{formatarMoeda(resultadoCLT.fgts)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">13º Salário (anual)</span>
                      <span className="font-medium">{formatarMoeda(resultadoCLT.decimoTerceiro)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">Férias + 1/3 (anual)</span>
                      <span className="font-medium">{formatarMoeda(resultadoCLT.ferias + resultadoCLT.umTercoFerias)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">Benefícios Mensais</span>
                      <span className="font-medium">{formatarMoeda(resultadoCLT.beneficiosMensais)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resultado PJ */}
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                  Equivalência PJ ({resultadoPJ.nomeRegime})
                </CardTitle>
                <CardDescription>Faturamento mensal necessário como PJ para manter o mesmo padrão</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Você precisa faturar mensalmente:</p>
                  <p className="text-3xl font-bold text-primary">{formatarMoeda(resultadoPJ.faturamentoPJMensal)}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Composição do Valor:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">Salário + 13º + Férias</span>
                      <span className="font-medium">{formatarMoeda(resultadoPJ.salarioMaisBeneficios - resultadoPJ.beneficiosMensais)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">Benefícios</span>
                      <span className="font-medium">{formatarMoeda(resultadoPJ.beneficiosMensais)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">Compensação FGTS (8%)</span>
                      <span className="font-medium">{formatarMoeda(resultadoPJ.compensacaoFGTS)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1">
                      <span className="text-muted-foreground">Imposto PJ ({resultadoPJ.nomeRegime})</span>
                      <span className="font-medium">{formatarMoeda(resultadoPJ.impostoMensal)}</span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Este valor garante que você mantenha o mesmo padrão de vida e benefícios que tinha no regime CLT.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Badge Contador Direto */}
            <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold text-primary mb-2">Vai abrir um PJ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Use a <strong>Contador Direto</strong> para cuidar de toda a burocracia e impostos!
                    </p>
                  </div>
                  <a
                    href="https://indicacao.contadordireto.com.br/indication/dd7dea00-c866-46f1-a19d-78d3be28f122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <Button size="lg" className="font-semibold">
                      Falar com Contador
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Calculadora;
