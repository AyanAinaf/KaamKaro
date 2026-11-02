import React from 'react';
import { WorkerSearchResult } from '../types/worker';
import { RatingDisplay } from './RatingDisplay';
import { AvailabilityBadge } from './AvailabilityBadge';
import { SkillBadge } from './SkillBadge';
import { MapPin, Sparkles, HelpCircle, PhoneCall, User, ShieldCheck } from 'lucide-react';

interface NewWorkerCardProps {
  result: WorkerSearchResult;
  onViewProfile: (workerId: string) => void;
  onRequestContact: (workerId: string, skillId: string) => void;
  onExplainRanking: (result: WorkerSearchResult) => void;
}

export const NewWorkerCard: React.FC<NewWorkerCardProps> = ({
  result,
  onViewProfile,
  onRequestContact,
  onExplainRanking,
}) => {
  const { worker, matchingSkill, ranking } = result;
  const rates = matchingSkill.serviceRates;

  return (
    <div className="bg-gradient-to-b from-amber-50/40 via-white to-white rounded-xl border border-amber-200/90 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all p-5 flex flex-col justify-between relative group">
      <div>
        {/* Top Tag Banner */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300/60 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>NEW WORKER DISCOVERY</span>
          </div>

          <div className="shrink-0 text-right">
            <AvailabilityBadge
              status={matchingSkill.availabilityStatus}
              expectedAvailableAt={worker.expectedAvailableAt}
              unavailabilityReason={worker.unavailabilityReason}
            />
          </div>
        </div>

        {/* Worker Info */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-sm shrink-0 uppercase tracking-wider shadow-xs">
            {worker.fullName.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                {worker.fullName}
              </h3>
              <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                {worker.workerId}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                {worker.location} ({worker.area})
              </span>
              <span>·</span>
              <span>{matchingSkill.experienceYears} yrs trade exp</span>
            </div>
          </div>
        </div>

        {/* Skill Box */}
        <div className="bg-white rounded-lg p-3 border border-amber-100 mb-3.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">
                Trained Trade:
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {matchingSkill.occupation}
              </span>
            </div>

            <button
              onClick={() => onExplainRanking(result)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-2 py-0.5 rounded transition-colors"
              title="View algorithmic ranking explanation"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Score: <strong className="font-mono">{ranking.totalScore}</strong></span>
            </button>
          </div>

          {/* New Worker Rating Status (No fake ratings!) */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <RatingDisplay
              rating={0}
              totalRatings={0}
              completedJobs={0}
              size="md"
            />

            <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Agent Verified</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2">
            {matchingSkill.workDescription}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
            Verified Trade Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchingSkill.skillTags.map(tag => {
              const isMatched = ranking.matchedTags.some(
                mt => mt.toLowerCase() === tag.toLowerCase()
              );
              return <SkillBadge key={tag} label={tag} isMatched={isMatched} size="sm" />;
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Introductory Rate
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              {rates.daily ? (
                <div className="font-bold text-slate-900 text-sm font-mono tabular-nums">
                  ₹{rates.daily.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500 font-sans">/day</span>
                </div>
              ) : null}
              {rates.hourly ? (
                <div className="text-xs text-slate-600 font-mono tabular-nums">
                  ₹{rates.hourly}<span className="text-[10px] font-sans">/hr</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400">Agent Check</span>
            <div className="text-xs font-medium text-slate-600 font-mono">
              {worker.agentId}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewProfile(worker.workerId)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </button>

          <button
            onClick={() => onRequestContact(worker.workerId, matchingSkill.skillId)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Request Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
};
