import { FormEvent, useState } from "react";
import { Games } from "../App";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Input } from "./Form/Input";
import { CaretDown, Check, GameController } from "phosphor-react";
import axios from "axios";

interface GamesProps {
  games: Games[];
}

export function CreateAdModal({ games }: GamesProps) {
  const [game, setGame] = useState<string>("");
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      console.log("Anuncio criado com sucesso");
    } catch (error) {
      console.log("Erro ao criar anuncio", error);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root value={game} onValueChange={setGame}>
              <Select.Trigger className="flex justify-between items-center gap-2 bg-zinc-900 py-3 px-4 rounded text-sm text-white">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content>
                  <Select.Viewport>
                    <Select.Group>
                      {games.map((game) => (
                        <Select.Item
                          key={game.id}
                          value={game.id}
                          className="bg-zinc-900 py-3 px-4 rounded text-sm text-white cursor-pointer"
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded 
                    ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}
                  `}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Segunda"
                  value="1"
                  className={`w-8 h-8 rounded 
                    ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}
                  `}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Terça"
                  value="2"
                  className={`w-8 h-8 rounded 
                    ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}
                  `}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Quarta"
                  value="3"
                  className={`w-8 h-8 rounded 
                    ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}
                  `}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Quinta"
                  value="4"
                  className={`w-8 h-8 rounded 
                    ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}
                  `}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Sexta"
                  value="5"
                  className={`w-8 h-8 rounded 
                    ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}
                  `}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Sábado"
                  value="6"
                  className={`w-8 h-8 rounded 
                    ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}
                  `}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 rounded-sm bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400 mx-auto" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
